import React from "react";
import styles from "./adminUsers.module.css";
import { getAllUsers } from "@/src/lib/data";
import { deleteUser } from "@/src/lib/action";

const AdminUsers = async () => {
  const users = await getAllUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user, index) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.user} key={index}>
            <span className={styles.userTitle}>
              {user.username || user.name}
            </span>
          </div>
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user._id} />
            <button className={styles.userButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
