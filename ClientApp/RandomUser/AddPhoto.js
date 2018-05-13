import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import actions from './actions';


const AddPhoto = props => {
  const {showModal, closeModal, setDescription,
    setFile, addPhoto, setCategory } = props;

  return (
    <div className="inmodal">
      <Modal style={{ top: `${20}%` }} className="modal-container" show={showModal} onHide={closeModal}>
        <form
          className="m-t"
          role="form"
          encType="multipart/form-data"
          onSubmit={addPhoto}
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Add Photo</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="clearfix">
              <div className="form-group has-feedback col-md-6">
                <label className="small font-noraml">Description:</label>
                <div className="form-group">
                  <textarea onChange={setDescription} rows="4" cols="50" className="form-control"  required/>
                </div>
              </div>
              <div className="form-group has-feedback col-md-6">
                <label className="small font-noraml">Add photo:</label>
                <div className="form-group">
                  <input
                    type="file"
                    accept="image/*"
                    name="image1"
                    className="form-control"
                    onChange={setFile}
                    data-button-text="Single"
                    data-class-button="btn btn-default"
                    data-classinput="form-control inline"
                    required
                  />
                </div>
              </div>
              <div className="form-group has-feedback col-md-6">
                <label className="small font-noraml">Select category:</label>
                <div className="form-group">
                  <select defaultValue="" onChange={setCategory}>
                    <option value="" disabled>Select category</option>
                      <option value="sport">Sport</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="casual">Casual</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" className="btn btn-white" onClick={closeModal}>Close</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

const mapDispatchToState = (dispatch, ownProps) => ({
  setDescription: e => dispatch(actions.setDescription(e.target.value)),
  setFile: e => dispatch(actions.setFile(e.target.files[0])),
  addPhoto: e => {
    e.preventDefault();
    dispatch(actions.addPhoto(ownProps.closeModal));
  },
    setCategory: e => dispatch(actions.setCategory(e.target.value)),
});


export default connect(null, mapDispatchToState)(AddPhoto);
