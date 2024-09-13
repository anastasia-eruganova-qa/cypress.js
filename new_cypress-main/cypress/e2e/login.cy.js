describe('Проверка авторизаций', function () {

    it('Верный пароль и верный логин', function () {
       cy.visit('https://login.qa.studio/'); // Зашли на сайт
       cy.get('#mail').type('german@dolnikov.ru '); // Ввели верный логин
       cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
       cy.get('#loginButton').click(); // Нажала войти
       cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю что после авторизации виден текст 
       cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
       })

       it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru '); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio3'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажала войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю на совпадение текста
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
        })

        it('Проверка на валидацию', function () {
            cy.visit('https://login.qa.studio/'); // Зашли на сайт
            cy.get('#mail').type('germandolnikov.ru '); // Ввели логин без @
            cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
            cy.get('#loginButton').click(); // Нажала войти
            cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю на совпадение текста
            cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
            cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
            })
        
            it('Проверка восстановления пароля', function () {
                cy.visit('https://login.qa.studio/'); // Зашли на сайт
                cy.get('#forgotEmailButton').click(); // Нажимаю восстановить пароль
                cy.get('#mailForgot').type('german@dolnikov.ru '); // Ввела почту для восстановления
                cy.get('#restoreEmailButton').click(); // Нажала отправить код
                cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текса 
                cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
                })
      
                it('Неверный логин и верный пароль', function () {
                    cy.visit('https://login.qa.studio/'); // Зашли на сайт
                    cy.get('#mail').type('german@dol.ru'); // Ввела неверный логин
                    cy.get('#pass').type('iLoveqastudio1'); // Ввела верный пароль
                    cy.get('#loginButton').click(); // Нажала войти
                    cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю на совпадение текста
                    cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                    cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
                    })

                    it('Проверка на приведение к строчным буквам в логине', function () {
                        cy.visit('https://login.qa.studio/'); // Зашли на сайт
                        cy.get('#mail').type(' GerMan@Dolnikov.ru'); // Ввела логин
                        cy.get('#pass').type('iLoveqastudio1'); // Ввела верный пароль
                        cy.get('#loginButton').click(); // Нажала войти
                        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю на совпадение текста
                        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
                        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя 
                        })
})

describe('Покупка аватара', function () {

    it('e2e тест на покупку нового аватара для тренера', function () {
       cy.visit('https://pokemonbattle.ru/shop'); // Зашли на сайт 
       cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // Ввела логин
       cy.get('#password').type('USER_PASSWORD'); // Ввела пароль 
       cy.get('.auth__button').click(); // Нажала кнопку войти 
       cy.wait(2000);
       cy.get('.header__container > .header__id').click({ force: true }); // Кликнула по шапке аватара 
       cy.get('[href="/shop"]').click(); // Нажимаем на смену аватара
       cy.get('.available > button').first().click({ force: true }); // Нажимаем купить первого аватара
       cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // Вводим номер карты
       cy.get(':nth-child(1) > .pay_base-input-v2').type('1227'); // Срок карты
       cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Код карты 
       cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Alena'); // Имя владельца карты 
       cy.get('.pay-btn').click(); // Нажимаем кнопку оплатить 
       cy.get('#cardnumber').type('56456'); // Вводим код подтверждения СМС
       cy.get('.payment__submit-button').click(); // нажимаем кнопку Отправить
       cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем наличие и видимость сообщения о успешной покупке
       })
})

   
