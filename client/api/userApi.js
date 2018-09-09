class UserApi {
	static getAllUsers() {
		const request = new Request(`${process.env.API_HOST}/users`, {
			method: 'GET'
		});
		
		return fetch(request)
			.then(response => {
				return response.json();
			}).catch(error => {
				return error;
			});
	};
	
	static saveUser(user) {
		const headers = { 'Content-Type': 'application/json' };

		const request = new Request(`${process.env.API_HOST}/users`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ user })
		});
		
		return fetch(request)
			.then(response => {
				return response.json();
			}).catch(error => {
				return error;
			});
	};
	
	static updateUser(user) {
		const headers = { 'Content-Type': 'application/json' };

		const request = new Request(`${process.env.API_HOST}/users/${user.id}`, {
			method: 'PUT',
			headers,
			body: JSON.stringify({ user })
		});
		
		return fetch(request)
			.then(response => {
				return response.json();
			}).catch(error => {
				return error;
			});
	};
	
	static deleteUser(user) {
		const request = new Request(`${process.env.API_HOST}/users/${user.id}`, {
			method: 'DELETE'
		});
		
		return fetch(request)
			.then(response => {
				return response;
			}).catch(error => {
				return error;
			});
	};
}

export default UserApi;
