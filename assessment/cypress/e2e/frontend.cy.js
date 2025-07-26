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
