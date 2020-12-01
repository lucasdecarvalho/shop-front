export class User {

    id: String;
	name: String;
	email: String;
	first_name: String;
	last_name: String;
	document_number?: String;
	birth_data: String;
	password: String;
	password_confirm: String;
	company_name: String;
	image: String;
	candidate_id?: Number;
	interviewer_id?: Number;
	step: Number;
	type: String;
	schedule: Number;
	phones: any[] = [
        {
            number: null,
            type: 'cell phone',
        },
        {
            number: null,
            type: 'home phone'
        }
    ];

	constructor(user?: any) {


		if (user)
			this.load(user)
	}

	load(user) {

		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.first_name = user.first_name;
		this.last_name = user.last_name;
		this.document_number = user.document_number;
		this.birth_data = user.birth_data;
		this.company_name = user.company_name;
		this.image = user.image;
		this.candidate_id = user.candidate_id;
		this.interviewer_id = user.interviewer_id;
		this.step = user.step;
		this.type = user.type;
		this.schedule = user.schedule;
		
		if (user.phones.length == 1) {
			
			this.phones = user.phones;
			this.phones.push({ number: null, type: 'home phone' });
		} else if (user.phones.length > 1) {

			this.phones = user.phones;
			this.phones.push({ number: null, type: 'home phone' });
		} else if (user.phones.length > 1) {

			this.phones = user.phones;

		} 
	}
}
