import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { Button, Modal, Table } from "react-bootstrap";

import { db } from "../../firebase";
import { useUserAuth } from "../../context/userContext";
import { toCommaFormat } from "../../utils/toCommaFormat";

import "./watchList.css";

const WatchList = ({ show, handleClose }) => {
  const [coins, setCoins] = useState([]);
  const { user, handleDelete } = useUserAuth();

  useEffect(
    () =>
      onSnapshot(collection(db, `${user.uid}`), (snapshot) => {
        setCoins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} className="watch-list">
        <Modal.Header closeButton>
          <Modal.Title>Crypto Watch List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Crypto</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coins.length > 0 &&
                coins.map((coin, idx) => (
                  <tr key={coin.id}>
                    <td>{idx + 1}</td>
                    <td>{coin.name}</td>
                    <td>USD {toCommaFormat(coin.price)}</td>
                    <td>
                      <Button
                        variant="transparent"
                        onClick={() => handleDelete(coin.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WatchList;
