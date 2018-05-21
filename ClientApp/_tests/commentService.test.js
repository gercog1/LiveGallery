import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { homeService } from '../Home/services';
import { randomService } from '../RandomUser/services';
import { singleServices } from '../SinglePhoto/services';
import { listServices } from '../UserList/services';
import { filteredService } from "../Filtered/service";

describe('Comment services', () => {
  let mock = new MockAdapter(axios);
  const data = { response: true };
  it('getPhotoComments', done => {
    mock.onGet('/Comment/GetCommentsForPost?=3d9fe240-5375-46ea-8b90-e34b83b7e701').reply(200, data);

    singleServices.getPhotoComments('3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
    it('getPhotoComments', done => {
        mock.onGet('/Comment/GetCommentsForPost?=3d9fe240-5375-46ea-8b90-e34b83b7e701').reply(200, data);

        singleServices.getPhotoComments('3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });
    it('getPhotoComments', done => {
        mock.onGet('/Comment/GetCommentsForPost?=3d9fe240-5375-46ea-8b90-e34b83b7e701').reply(200, data);

        singleServices.getPhotoComments('3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });
  it('addComment', done => {
    mock.onPost('/Comment/CreateComment', {
      UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e',
      PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701',
      Text: 'text',
    }).reply(200, data);

    const userId ='6d9b5318-fbd3-49ab-8b77-c25fd69cd96e';
    const postId= '3d9fe240-5375-46ea-8b90-e34b83b7e701';
    const text=  'text';
    axios.post('/Comment/CreateComment' , {
      UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e',
      PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701',
      Text: 'text',
    }).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('deleteComment', done => {
    mock.onPost('/Comment/DeleteComment?=c7c7602b-4ac2-4030-8251-cc4b1eacbfe3').reply(200, data);

    singleServices.deleteComment('c7c7602b-4ac2-4030-8251-cc4b1eacbfe3').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

});


