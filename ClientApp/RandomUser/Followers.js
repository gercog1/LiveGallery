import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import actions from './actions';


const Followers = props => {
  const {showFollowers,
      closeFollowers,
  } = props;

  return (
    <div className="inmodal">
      <Modal style={{ top: `${20}%` }} className="modal-container" show={showFollowers} onHide={closeFollowers}>
        <form
          className="m-t"
          role="form"
          // onSubmit={addPhoto}
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Followers</h4>
          </Modal.Header>
          <Modal.Body />

          <Modal.Footer>
            <button type="button" className="btn btn-white" onClick={closeFollowers}>Close</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});


export default connect(null, mapDispatchToProps)(Followers);
