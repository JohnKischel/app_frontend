import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [newName, setNewName] = useState("");
  //gen random integer
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const create_user = async () => {
    const res = await fetch(`http://0.0.0.0:8080/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: randomInt(0, 9999), name: newName }),
    });
    setTrigger(trigger + 1);
  };

  const delete_user = async () => {
    const res = await fetch(`http://0.0.0.0:8080/users/${userId}`, {
      method: "DELETE",
    });
    setTrigger(trigger + 1);
  };

  const update_user = async () => {
    const res = await fetch(`http://0.0.0.0:8080/users/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, name: newName }),
    });
    setTrigger(trigger + 1);
  };

  const POSTcmd =
    "curl -X POST -H 'Content-Type: application/json' -d '{'id':2,'name':'curly'}' 0.0.0.0:8080/users";
  const DELETEcmd = "curl -X DELETE 0.0.0.0:8080/users/1";
  const PUTcmd =
    "curl -X PUT -H 'Content-Type: application/json' -d '{'id':2,'name':'newname'}' 0.0.0.0:8080/users/";

  const fetchUsers = async () => {
    const res = await fetch("http://0.0.0.0:8080/users/");
    const data = await res.json();
    setUsers(data.message);
  };

  useEffect(() => {
    fetchUsers();
  }, [trigger]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full grid grid-rows-3 flex-wrap grid-flow-col justify-center gap-4 mt-5">
        <div className="row-span-full">
          <div className="border-2 border-black w-96 rounded-tl-lg">
            <div className="text-center">
              <h1 className="text-lg font-bold bg-slate-950 text-white">GET</h1>
            </div>
            <div className="m-5">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.id}</td>
                      <td className="border px-4 py-2">{user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-2 border-black w-96 rounded-tl-lg">
          <div className="text-center">
            <h1 className="text-lg font-bold bg-slate-950 text-white">POST</h1>
          </div>
          <div className="m-5 flex gap-3">
            <input
              className="w-full border-2 border-black rounded p-2"
              onKeyUp={(e: any) => {
                setNewName(e.target.value);
              }}
            />
            <button
              onClick={() => create_user()}
              className="bg-black hover:bg-slate-800 w-full text-white font-bold py-2 px-4 rounded"
            >
              Create user
            </button>
          </div>
        </div>
        <div className="border-2 border-black w-96 rounded-tl-lg">
          <div className="text-center">
            <h1 className="text-lg font-bold bg-slate-950 text-white">
              DELETE
            </h1>
            <div className="m-5 flex gap-3">
              <input
                type={"number"}
                min={1}
                className="w-full border-2 border-black rounded p-2"
                onKeyUp={(e: any) => {
                  setUserId(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  delete_user();
                }}
                className="bg-black hover:bg-slate-800 w-full text-white font-bold py-2 px-4 rounded"
              >
                Delete user
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 border-black w-96 rounded-tl-lg">
          <div className="text-center">
            <h1 className="text-lg font-bold bg-slate-950 text-white">PUT</h1>
          </div>
          <div className="m-5 flex gap-3">
            <input
              type={"number"}
              min={1}
              onKeyUp={(e: any) => {
                setUserId(e.target.value);
              }}
              className="w-full border-2 border-black rounded p-2"
            />
            <input
              type={"string"}
              min={1}
              className="w-full border-2 border-black rounded p-2"
              placeholder="New name"
              onKeyUp={(e: any) => {
                setNewName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                update_user();
              }}
              className="bg-black hover:bg-slate-800 w-full text-white font-bold py-2 px-4 rounded"
            >
              Update user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
