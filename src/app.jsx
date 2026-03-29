import { useEffect, useMemo, useState } from "react";

export default function App() {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const trackingApiUrl =
    "https://script.google.com/macros/s/AKfycbzNGT0GNe49p7UebfQSV0tnzn4FUesNqPsKyWgObp7dM6D6e-VTyMa96QepCQIge4hVbA/exec";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(trackingApiUrl);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to load tracking data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const result = useMemo(() => {
    const id = trackingId.trim().toUpperCase();
    if (!id) return null;
    return data[id] || "not_found";
  }, [trackingId, data]);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>JAL's Logistics & Air Cargo</h1>
      <p>Track your package</p>

      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        style={{ padding: 10, width: "300px" }}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!trackingId && <p>Enter a tracking ID above</p>}

      {result === "not_found" && <p>Tracking ID not found</p>}

      {result && result !== "not_found" && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Updated:</strong> {result.updated}</p>
          <p><strong>Notes:</strong> {result.notes}</p>
        </div>
      )}
    </div>
  );
}
