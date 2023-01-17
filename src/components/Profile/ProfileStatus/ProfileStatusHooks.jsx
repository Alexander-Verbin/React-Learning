import React, { useState, useEffect } from "react";
import s from "./ProfileStatus.module.css"

const ProfileStatusHooks = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const activateMode = () => {
    setEditMode(true)
  };
  const deactivateMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={s.wrapper}>
      {!editMode &&
        <div>
          <p onDoubleClick={activateMode} className={s.status}>{props.status || "----"}</p>
        </div>
      }
      {editMode &&
        <div>
          <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateMode} type="text" className={s.status}
            placeholder="Status" value={status} />
        </div>
      }
    </div>
  );
};

export default ProfileStatusHooks;