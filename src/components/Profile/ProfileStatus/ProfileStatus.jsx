import React from "react";
import s from "./ProfileStatus.module.css"

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  };

  componentDidUpdate(prevProps, PrevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div className={s.wrapper}>
        {!this.state.editMode &&
          <div>
            <p onDoubleClick={this.activateEditMode} className={s.status}>{this.props.status || "----"}</p>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} type="text" className={s.status}
              placeholder="Status" value={this.state.status} />
          </div>
        }
      </div>
    );
  };
};

export default ProfileStatus;