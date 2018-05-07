import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import actions from './actions';


const Following = props => {
  const {showFollowing,
      closeFollowing,
  } = props;

  return (
    <div className="inmodal">
      <Modal style={{ top: `${20}%` }} className="modal-container" show={showFollowing} onHide={closeFollowing}>
        <form
          className="m-t"
          role="form"
          // onSubmit={addPhoto}
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Following</h4>
          </Modal.Header>
          <Modal.Body />

          <Modal.Footer>
            <button type="button" className="btn btn-white" onClick={closeFollowing}>Close</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});


export default connect(null, mapDispatchToProps)(Following);
