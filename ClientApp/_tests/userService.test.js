import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {listServices} from "../UserList/services";
import { loginService } from "../LoginPage/services";
import {singleServices} from "../SinglePhoto/services";
import { randomService } from "../RandomUser/services";

describe('User services', () => {
  let mock = new MockAdapter(axios);
  const data = { response: true };
  it('getAllUsers', done => {
    mock.onGet('/Account/GetAllUsers').reply(200, data);

    listServices.getUsers().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

    it('getAllUsers', done => {
        mock.onGet('/Account/GetAllUsers').reply(200, data);

        listServices.getUsers().then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });

  it('getFollowers', done => {
    mock.onGet('/Account/GetSubscribers?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').reply(200, data);

    randomService.getFollowers('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('getFollowers', done => {
    mock.onGet('/Account/GetSubscribers?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').reply(200, data);

    randomService.getFollowers('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('getFollowers', done => {
    mock.onGet('/Account/GetSubscribers?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').reply(200, data);

    randomService.getFollowers('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('getFollowing', done => {
    mock.onGet('/Account/GetSubscriptions?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').reply(200, data);

    randomService.getFollowing('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('deleteUser', done => {
    mock.onGet(`/Account/DeleteUser?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e`).reply(200, data);

    listServices.deleteUser('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('deleteUser', done => {
    mock.onGet(`/Account/DeleteUser?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e`).reply(200, data);

    listServices.deleteUser('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('deleteUser', done => {
    mock.onGet(`/Account/DeleteUser?=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e`).reply(200, data);

    listServices.deleteUser('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('subscribe', done => {
    mock.onPost('/Account/Subscribe', { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , SubscriberId: '3d9fe240-5375-46ea-8b90-e34b83b7e701' }).reply(200, data);

    listServices.subscribe('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , '3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('subscribe', done => {
    mock.onPost('/Account/Subscribe', { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , SubscriberId: '3d9fe240-5375-46ea-8b90-e34b83b7e701' }).reply(200, data);

    listServices.subscribe('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , '3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('subscribe', done => {
    mock.onPost('/Account/Subscribe', { UserId: '6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , SubscriberId: '3d9fe240-5375-46ea-8b90-e34b83b7e701' }).reply(200, data);

    listServices.subscribe('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e' , '3d9fe240-5375-46ea-8b90-e34b83b7e701').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('login', done => {
    mock.onPost('/Account/Login', { Email: 'thefirstflyerok@gmail.com' , Password: '1' }).reply(200, data);

    loginService.login('thefirstflyerok@gmail.com', '1').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
  it('getOneUser', done => {
    mock.onGet('/Account/GetUser?userID=6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').reply(200, data);

    randomService.getUser('6d9b5318-fbd3-49ab-8b77-c25fd69cd96e').then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

});