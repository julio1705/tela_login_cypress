describe('Teste de Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Deve validar campos obrigatórios', () => {
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=email-error]').should('contain', 'O campo Email é obrigatório');
    cy.get('[data-cy=cpf-error]').should('contain', 'O campo CPF é obrigatório');
    cy.get('[data-cy=password-error]').should('contain', 'O campo Senha é obrigatório');
  });

  it('Deve realizar login com sucesso', () => {
    cy.get('[data-cy=email-input]').type('usuario@example.com');
    cy.get('[data-cy=cpf-input]').type('123.456.789-00');
    cy.get('[data-cy=password-input]').type('senhaSegura123');
    cy.get('[data-cy=login-button]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=welcome-message]').should('contain', 'Bem-vindo, Usuário!');
  });

  it('Deve exibir mensagem de erro para credenciais inválidas', () => {
    cy.get('[data-cy=email-input]').type('usuario@invalido.com');
    cy.get('[data-cy=cpf-input]').type('987.654.321-00');
    cy.get('[data-cy=password-input]').type('senhaErrada123');
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-error]').should('contain', 'Credenciais inválidas. Verifique seus dados.');
  });
});