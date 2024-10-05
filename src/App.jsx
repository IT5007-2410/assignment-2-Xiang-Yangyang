const newTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: 88885555,
    email: 'jack@example.com',
    age: 28,
    gender: 'Male',
    seatNumber: 'A1',
    isVIP: false,
    bookingTime: new Date(),
  },
  {
    id: 2,
    name: 'Rose',
    phone: 88884444,
    email: 'rose@example.com',
    age: 25,
    gender: 'Female',
    seatNumber: 'B2',
    isVIP: true,
    bookingTime: new Date(),
  },
];

function TravellerRow(props) {
  const { traveller, onDelete } = props;
  return (
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.age}</td>
      <td>{traveller.gender}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.isVIP ? 'Yes' : 'No'}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>
      <td>
        <button onClick={() => onDelete(traveller.id)}>Delete</button>
      </td>
    </tr>
  );
}

function Display(props) {
  const { travellers, onDelete } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Seat Number</th>
          <th>VIP</th>
          <th>Booking Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {travellers.map((traveller) => (
          <TravellerRow
            key={traveller.id}
            traveller={traveller}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      seatNumber: '',
      isVIP: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTraveller = {
      id: this.props.travellers.length + 1,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      age: parseInt(this.state.age),
      gender: this.state.gender,
      seatNumber: this.state.seatNumber,
      isVIP: this.state.isVIP,
      bookingTime: new Date(),
    };
    this.props.bookTraveller(newTraveller);
    this.setState({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      seatNumber: '',
      isVIP: false,
    });
  }

  handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={this.state.age}
          onChange={this.handleChange}
        />

        <label>
          Gender:
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <input
          type="text"
          name="seatNumber"
          placeholder="Seat Number"
          value={this.state.seatNumber}
          onChange={this.handleChange}
        />
        <label>
          VIP:
          <input
            type="checkbox"
            name="isVIP"
            checked={this.state.isVIP}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idToDelete: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = parseInt(this.state.idToDelete);
    this.props.deleteTraveller(id);
    this.setState({ idToDelete: '' });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          name="idToDelete"
          placeholder="Enter Traveller ID to Delete"
          value={this.state.idToDelete}
          onChange={this.handleChange}
        />
        <button type="submit">Delete</button>
      </form>
    );
  }
}

class SeatGrid extends React.Component {
  render() {
    const totalSeats = 10;
    const bookedSeats = this.props.travellers.length;

    const seats = Array.from({ length: totalSeats }, (_, i) => {
      const isBooked = i < bookedSeats;
      return (
        <div
          key={i}
          style={{
            backgroundColor: isBooked ? 'grey' : 'green',
            margin: '5px',
            padding: '10px',
            width: '40px',
            height: '40px',
          }}
        />
      );
    });

    return <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '220px' }}>{seats}</div>;
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [],
      selector: 'homepage',
      totalSeats: 10,
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: newTravellers });
    }, 500);
  }

  setSelector(value) {
    this.setState({ selector: value });
  }

  bookTraveller(newTraveller) {
    if (this.state.travellers.length < 10) {
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, newTraveller],
      }));
    } else {
      alert('No more available seats!');
    }
  }

  deleteTraveller(id) {
    const travellerExists = this.state.travellers.some(
      (traveller) => traveller.id === id
    );
    
    if (!travellerExists) {
      alert(`Traveller with ID ${id} does not exist!`);
      return;
    }
  
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(
        (traveller) => traveller.id !== id
      ),
    }));
  }

  render() {
    const { selector, travellers, totalSeats } = this.state;

    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          <button onClick={() => this.setSelector('homepage')}>Homepage</button>
          <button onClick={() => this.setSelector('add')}>Add Traveller</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
          <button onClick={() => this.setSelector('delete')}>Delete Traveller</button>
        </div>
        <div>
          {selector === 'homepage' && (
            <div>
              <h2>Available Seats: {totalSeats - travellers.length} / {totalSeats}</h2>
              <SeatGrid travellers={travellers} />
            </div>
          )}
          {selector === 'add' && (
            <Add travellers={travellers} bookTraveller={this.bookTraveller} />
          )}
          {selector === 'display' && (
            <Display travellers={travellers} onDelete={this.deleteTraveller} />
          )}
          {selector === 'delete' && (
            <DeleteForm deleteTraveller={this.deleteTraveller} />
          )}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));