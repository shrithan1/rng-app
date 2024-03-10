"use client";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Random {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };

  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  registered: {
    date: string;
    age: number;
  };
}

export default function RandomUser() {
  const [random, setRandom] = useState<Random>();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://randomuser.me/api/?results=5");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setRandom(data.results[0]);
    };

    fetchUser();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (random)
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div>
              <img src={random.picture.large} alt="random user image" />
            </div>
            {random.name.title} {random.name.first} {random.name.last}
          </CardTitle>
          <CardDescription>
            <div>Gender: {random.gender}</div>
            <div>Age: {random.dob.age}</div>
            <div>Email: {random.email}</div>
            <div>Phone: {random.phone}</div>
            {showDetails && (
              <>
                <div>
                  Address: {random.location.street.number}{" "}
                  {random.location.street.name}
                </div>
                <div>
                  Location: {random.location.city}, {random.location.state},{" "}
                  {random.location.country}
                </div>
                <div>
                  Registered: {random.registered.date} at age:{" "}
                  {random.registered.age}
                </div>
              </>
            )}
            <Button onClick={toggleDetails}>
              {showDetails ? "Less info" : "More info"}
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    );
}
