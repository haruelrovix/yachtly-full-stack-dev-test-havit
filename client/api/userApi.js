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
}

export default UserApi;
