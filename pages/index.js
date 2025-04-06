import { useState } from "react";

export default function AirdropForm() {
  const [form, setForm] = useState({
    twitter: "",
    retweet: "",
    wallet: "",
    email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValidWallet = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidWallet(form.wallet)) {
      setError("Invalid wallet address.");
      return;
    }

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Submission failed. Try again later.");
    }
  };

  if (submitted) {
    return <div className="p-4 text-green-600">Thanks! We received your submission.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">MYKS Airdrop Registration</h1>

      <input
        type="text"
        placeholder="@Twitter username"
        className="w-full p-2 border rounded"
        value={form.twitter}
        onChange={(e) => setForm({ ...form, twitter: e.target.value })}
        required
      />

      <input
        type="url"
        placeholder="Link to your retweet"
        className="w-full p-2 border rounded"
        value={form.retweet}
        onChange={(e) => setForm({ ...form, retweet: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Polygon wallet address"
        className="w-full p-2 border rounded"
        value={form.wallet}
        onChange={(e) => setForm({ ...form, wallet: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email (optional)"
        className="w-full p-2 border rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
    }
