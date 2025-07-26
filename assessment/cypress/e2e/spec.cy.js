// ---------------- FRONTEND TESTS ----------------
import "cypress-real-events/support";
import dotenv from 'dotenv';
dotenv.config();

describe('Events App Frontend Tests', () => {
  let name = `Test-User_${Date.now()}`;
  let email = `test-user_${Date.now()}@gmail.com`;
  let admin_email = "crio.do.test@example.com"
  let password = "12345678";

  // Helper function to log in
  function login(email, password) {
    cy.contains('Explore Events')
    cy.contains('Login').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/events');
  }

  // Register the user once before all tests
  before(() => {
    cy.visit('/events');
    cy.contains('Signup').click();

    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/events');
    cy.contains(`Explore Events`).should('be.visible');
    cy.contains('Logout').click();
  });

  context('Welcome Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should display the Welcome Page and Explore Events button', () => {
      cy.contains('Welcome to The Social Hub').should('be.visible');
      cy.contains('Explore Events').should('be.visible');
    });
  });

  context('Public Pages', () => {
    beforeEach(() => {
      cy.visit('/events');
    });

    it('Should display Logo, Login, Signup Buttons', () => {
      cy.get('nav').within(() => {
        cy.contains('The Social Hub').should('be.visible');
        cy.contains('Login').should('be.visible');
        cy.contains('Signup').should('be.visible');
      });
    });

    it('Should have Explore Events Header, Search Button', () => {
      cy.contains('Explore Events').should('be.visible');
      cy.contains('Search').should('be.visible');
    });

    it('Should Display the Events', () => {
      cy.contains('updated test event 123').should('be.visible');
      cy.contains('Ranchi').should('be.visible');
      cy.contains('Upcoming').should('be.visible');
    });
  });

  context('User Logged-in Features', () => {
    beforeEach(() => {
      cy.visit('/events');
      login(email, password);
    });

    it('Should display Logo, Dashboard, Profile, Logout Buttons', () => {
      cy.get('nav').within(() => {
        cy.contains('The Social Hub').should('be.visible');
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Profile').should('be.visible');
        cy.contains('Logout').should('be.visible');
      });
    });

    it('Should show user details & request organizer button in the profile section', () => {
      cy.contains('Profile').click();
      cy.contains('Your Profile').should('be.visible');
      cy.contains('Name').should('be.visible');
      cy.contains('Email').should('be.visible');
      cy.contains('Change Avatar').should('be.visible');
      cy.contains('Save Changes').should('be.visible');
      cy.contains('Participant').should('be.visible');
      cy.contains('Request Organizer Role').should('be.visible');
    });

    it('User should be see his dashboard', () => {
      cy.contains('Dashboard').click();
      cy.contains('Welcome').should('be.visible');
      cy.contains('Your Registered Events').should('be.visible');
    });
  });

  context('Admin Logged-in Features', () => {
    beforeEach(() => {
      cy.visit('/events');
      login(admin_email, password);
    });

    it('Should display Logo, Dashboard, Profile, Logout Buttons', () => {
      cy.get('nav').within(() => {
        cy.contains('The Social Hub').should('be.visible');
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Profile').should('be.visible');
        cy.contains('Logout').should('be.visible');
      });
    });

    it('Should display Admin & Organizer Buttons', () => {
      cy.get('nav').within(() => {
        cy.contains('The Social Hub').should('be.visible');
        cy.contains('Admin').should('be.visible');
        cy.contains('Organizer').should('be.visible');
      });
    });

  });
});

// ---------------- BACKEND API TESTS ----------------
describe('Events App Backend Tests', () => {
    let name = `Test-User_${Date.now()}`;
    let email = `test-user_${Date.now()}@gmail.com`;
    let temp_email = email;
    let admin_email = "crio.do.test@example.com";
    const password = "12345678";
    const avatar = "https://picsum.photos/200";
    let token;
    let admin_token;
    let user_id;
    let admin_id;
    let event_id;
  
    it('User should be able to Signup using his details', () => {
        cy.backendRequest({
          method: "POST",
          url: "/api/auth/register",
          body:  { "name" : `${name}`, "email" : `${email}`,  "password" : `${password}`, "avatar" : `${avatar}`},
        })
        .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.token).to.not.be.empty;
      });
    });

    it('User should be able to Login using his email and password', () => {
      cy.backendRequest({
        method : 'POST', 
        url : `/api/auth/login`,
        body : { "email" : `${temp_email}`,  "password" : `${password}`}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${temp_email}`);
        expect(response.body.token).to.not.be.empty;
        expect(response.body.user.id).not.to.be.empty;
        token = response.body.token;
        user_id = response.body.user.id;
      });
    });

    it('User should be able to request for organizer role', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/users/request-organizer`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Organizer request submitted successfully");
      });
    });

    it('User should be able to update his profile', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/users/profile`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name" : "Crio.Do - Events App"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Crio.Do - Events App");
      });
    });
    
    it("Admin Login", () => {
      cy.backendRequest({
        method: 'POST',
        url: '/api/auth/login',
        body: {"email" : `${admin_email}`, password : `${password}`}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.email).to.eq(`${admin_email}`);
        expect(response.body.token).to.not.be.empty;
        admin_token = response.body.token;
        admin_id = response.body.user.id;
      })
    });

    it('Admin Should be able to see all organizer requests', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/admin/organizer-requests`,
        headers: {
          Authorization: `Bearer ${admin_token}`
        },
        body: {}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });

    it('Admin Should be able to approve/reject an organizer request', () => {
      console.log(user_id);
      cy.backendRequest({
        method: 'PUT',
        url: `/api/admin/users/${user_id}/approve-organizer`,
        headers: {
          Authorization: `Bearer ${admin_token}`
        },
        body: {}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('User approved as Organizer');
      });
    });

    it('Admin/Organizer should be able to create an event', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/events`,
        headers: {
          Authorization: `Bearer ${admin_token}`
        }, body : {
            "title" : "test event 123", 
            "description" : "This is a test event 123",
            "startDate" : "2025-06-29", 
            "startTime" : "03:55", 
            "endDate" : "2025-06-30", 
            "endTime" : "04:55",
            "location" : "Ranchi", 
            "eventType" : "Offline", 
            "category" : "Test", 
            "image" : "https://picsum.photos/200"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq("test event 123");
        expect(response.body.description).to.eq("This is a test event 123");
        expect(response.body.eventType).to.eq("Offline");
        expect(response.body.category).to.eq("Test");
        expect(response.body.organizer).to.eq(`${admin_id}`);
        expect(response.body._id).not.to.be.empty;
        event_id = response.body._id;
      });
    });

    it('Admin/Organizer should be able to edit an event', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/events/${event_id}`,
        headers: {
          Authorization: `Bearer ${admin_token}`
        }, body : {
            "title" : "updated test event 123", 
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Event updated");
        expect(response.body.event.title).to.eq("updated test event 123");
        expect(response.body.event.description).to.eq("This is a test event 123");
      });
    });

    it('Get an Event by id', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/events/${event_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test event 123");
        expect(response.body.description).to.eq("This is a test event 123");
      });
    });

    it('User should be able to register for an event', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/registration/${event_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq("Registered successfully");
      });
    });

    it('User should be able to cancel a registration', () => {
      cy.backendRequest({
        method: 'DELETE',
        url: `/api/registration/${event_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Registration cancelled");
      });
    });
});
