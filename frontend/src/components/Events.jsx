import React, { useState } from "react";
import "../Events.css";

const eventsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    title: "updated test event 123",
    date: "6/10/2025",
    time: "08:00",
    description: "A once-in-a-lifetime adventure to scale the Wall before it melts. Gear provided by the Night's Watch. Raven certificate on completion.",
    location: "Ranchi",
    status: "Upcoming",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Westeros Fashion Gala",
    date: "6/9/2025",
    time: "19:00",
    description: "From Stark furs to Lannister gold. Watch the top designers from Oldtown to Dorne showcase royal looks.",
    location: "Citadel Courtyard, Oldtown",
    status: "Upcoming",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    title: "Iron Bank Investment Pitch",
    date: "6/8/2025",
    time: "13:00",
    description: "Join the Iron Bank's secret investors' meeting. Learn how to fund kingdoms, manipulate war outcomes, and stay rich no matter who wins.",
    location: "Bank Vaults, Braavos",
    status: "Upcoming",
  },
];

const Events = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <div className="events-bg">
      <h2 className="events-title highlight">Explore Events</h2>
      <div className="events-filters">
        <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
        <input type="text" placeholder="Event type (e.g. Music)" value={type} onChange={e => setType(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
        <button className="search-btn">Search</button>
      </div>
      <div className="events-grid">
        {eventsData.map(event => (
          <div className="event-card" key={event.id}>
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-date">{event.date} | {event.time}</div>
              <div className="event-desc">{event.description}</div>
              <div className="event-location">{event.location}</div>
              <div className="event-status">{event.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;