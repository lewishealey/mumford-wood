import React, { useEffect, useState } from "react";
import fire, { firebaseConfig } from "@lib/firebase";
import AdminLayout from "src/layouts/AdminLayout";
import LoggedIn from "@components/LoggedIn";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [brochures, setBrochures] = useState([]);
  const [apprenticeships, setAppenticeships] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection("users")
      .onSnapshot((snap) => {
        const users = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(users);
      });

    fire
      .firestore()
      .collection("newsletter-signups")
      .onSnapshot((snap) => {
        const subscribers = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubscribers(subscribers);
      });

    fire
      .firestore()
      .collection("apprentice-requests")
      .onSnapshot((snap) => {
        const apprentices = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppenticeships(apprentices);
      });

    fire
      .firestore()
      .collection("download-requests")
      .onSnapshot((snap) => {
        const brochures = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBrochures(brochures);
      });

    fire
      .firestore()
      .collection("estimate-requests")
      .onSnapshot((snap) => {
        const estimates = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEstimates(estimates);
      });

    fire
      .firestore()
      .collection("downloads")
      .onSnapshot((snap) => {
        const downloads = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDownloads(downloads);
      });
  }, []);

  console.log(users);

  return (
    <AdminLayout title="Welcome to your dashboard">
      <LoggedIn location="Admin" entity="Admin">
        <div className="grid grid-cols-3 grid-rows-3 p-2 gap-1">
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Registered users
            </h3>
            <h2 className="text-6xl font-extrabold">{users.length}</h2>
          </div>
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Newsletter subscribers
            </h3>
            <h2 className="text-6xl font-extrabold">{subscribers.length}</h2>
          </div>
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Downloads
            </h3>
            <h2 className="text-6xl font-extrabold">{downloads.length}</h2>
          </div>
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Brochures requested
            </h3>
            <h2 className="text-6xl font-extrabold">{brochures.length}</h2>
          </div>
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Estimates requested
            </h3>
            <h2 className="text-6xl font-extrabold">{estimates.length}</h2>
          </div>
          <div className="p-1 border-neutral-4 border rounded-md">
            <h3 className="font-heading text-neutral-2 text-sm md:text-base uppercase font-bold tracking-widest md:mb-0.5">
              Apprenticeship applications
            </h3>
            <h2 className="text-6xl font-extrabold">
              {apprenticeships.length}
            </h2>
          </div>
        </div>
      </LoggedIn>
    </AdminLayout>
  );
};

export default Index;
