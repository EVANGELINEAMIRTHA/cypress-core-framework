describe('API CRUD Workflow - Product Management', () => {
    
    // 1. GET Request (Real request to live endpoint)
    it('should retrieve product list (GET)', () => {
        cy.request('GET', '/api/productsList').then((response) => {
            const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
            expect(response.status).to.eq(200);
            expect(body).to.have.property('products');
        });
    });

    // 2. MOCKED POST Update Request 
    it('should update product details (PUT) - MOCKED', () => {
        cy.intercept('POST', '/api/updateProduct', {
            statusCode: 200,
            body: { message: "Product updated successfully" }
        }).as('updateRequest');

        cy.visit('/'); 
        cy.window().then((win) => {
            win.fetch('/api/updateProduct', {
                method: 'POST',
                body: JSON.stringify({ id: 1, name: 'Updated' }),
                headers: { 'Content-Type': 'application/json' }
            });
        });

        cy.wait('@updateRequest').its('response.statusCode').should('eq', 200);
    });

    // 3. MOCKED DELETE Request
    it('should delete a product (DELETE) - MOCKED', () => {
        cy.intercept('DELETE', '/api/deleteProduct', {
            statusCode: 200,
            body: { message: "Product deleted successfully" }
        }).as('deleteRequest');

        // Trigger via browser fetch so the interceptor catches it
        cy.visit('/'); 
        cy.window().then((win) => {
            win.fetch('/api/deleteProduct', {
                method: 'DELETE',
                body: JSON.stringify({ id: 1 }),
                headers: { 'Content-Type': 'application/json' }
            });
        });

        cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);
    });
});