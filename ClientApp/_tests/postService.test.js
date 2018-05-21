import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { homeService } from '../Home/services';
import { randomService } from '../RandomUser/services';
import { singleServices } from '../SinglePhoto/services';
import { listServices } from '../UserList/services';
import { filteredService } from "../Filtered/service";
import { globalService } from "../services";

describe('Post services', () => {
  let mock = new MockAdapter(axios);
  const data = { response: true };
  it('getEveryPost', done => {
    mock.onGet('/Post/GetAllPosts').reply(200, data);

    homeService.getEveryPost().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('getAllPosts', done => {
    mock.onGet(`/Post/GetPostsBySubscribers?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e`).reply(200, data);

    homeService.getEveryPost().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('getFilteredByCategory', done => {
    mock.onGet(`/Post/GetPostsByCategory?=lifestyle`).reply(200, data);

    filteredService.getFilteredPhotos('lifestyle').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('getFilteredByCountry', done => {
    mock.onGet(`/Post/GetPostsByCountry?=Ukraine`).reply(200, data);

    filteredService.getFilterByCountry('Ukraine').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });


  it('getProfilePosts', done => {
    mock.onGet(`/Post/GetUserPosts?userID=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e`).reply(200, data);

    randomService.getProfilePosts('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
    it('setLike', done => {
        mock.onPost(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).reply(200, data);

        axios.post(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });
    it('setLike', done => {
        mock.onPost(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).reply(200, data);

        axios.post(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });

  it('addPhoto', done => {
    mock.onPost(`/Post/CreatePost`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', Description: 'aaa', Category: 'lifestyle', File: new File(['img'], 'img.png') }).reply(200, data);

    axios.post(`/Post/CreatePost`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', Description: 'aaa', Category: 'lifestyle', File: new File(['img'], 'img.png') }).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('deletePhoto', done => {
    mock.onGet(`/Post/DeletePost?=3d9fe240-5375-46ea-8b90-e34b83b7e701`).reply(200, data);

    randomService.deletePhoto('3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('getOnePost', done => {
    mock.onGet(`/Post/GetPost?=3d9fe240-5375-46ea-8b90-e34b83b7e701`).reply(200, data);

    singleServices.getOnePost('3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('setLike', done => {
    mock.onPost(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).reply(200, data);

    axios.post(`/Post/SetLike`, { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e', PostId: '3d9fe240-5375-46ea-8b90-e34b83b7e701'}).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});


