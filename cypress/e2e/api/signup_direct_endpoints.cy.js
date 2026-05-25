describe('Direct Signup Endpoint Testing (Clean Fixture Inheritance)', () => {
  
  beforeEach(function () {
    // Regular function here allows Cypress to bind fixture data to 'this'
    cy.fixture('example').as('data');
  });

  it('1. POST /api/createAccount — Create Account by Reusing Fixture Data', function () {
    const data = this.data.signupUser;
    
    const dynamicPayload = {
      name: data.name,
      email: `api_automated_${Date.now()}@gmail.com`, // Keeps the run unique and clean
      password: data.password,
      title: 'Mrs', 
      birth_date: '10',
      birth_month: 'May',
      birth_year: '1999',
      firstname: data.firstName,
      lastname: data.lastName,
      company: 'Rockwell Automation',
      address1: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      mobile_number: data.mobileNumber 
    };

    // ✅ FIXED: Explicitly attached the body attribute here
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true, 
      failOnStatusCode: false,
      body: dynamicPayload 
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      const bodyParsed = JSON.parse(response.body);
      expect(bodyParsed).to.have.property('responseCode', 201);
      expect(bodyParsed).to.have.property('message', 'User created!');
    });
  });

  it('2. POST /api/createAccount — Validation Check Against Pre-Existing Email', function () {
    const existingData = this.data.signupUserExistingEmail;
    const baseData = this.data.signupUser;
    
    // ✅ FIXED: Added all required profile keys so the backend doesn't complain about missing parameters
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      failOnStatusCode: false,
      body: {
        name: existingData.name,
        email: existingData.email, // Using the pre-existing email asset
        password: 'Password999!',
        title: 'Mrs',
        birth_date: '10',
        birth_month: 'May',
        birth_year: '1999',
        firstname: baseData.firstName,
        lastname: baseData.lastName,
        company: 'Rockwell Automation',
        address1: baseData.address,
        country: baseData.country,
        state: baseData.state,
        city: baseData.city,
        zipcode: baseData.zipcode,
        mobile_number: baseData.mobileNumber
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      const bodyParsed = JSON.parse(response.body);
      expect(bodyParsed).to.have.property('responseCode', 400);
      expect(bodyParsed).to.have.property('message', 'Email already exists!');
    });
  });
});