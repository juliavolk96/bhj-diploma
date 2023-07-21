class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', function (event) {
      event.preventDefault();
      const body = document.querySelector('body');
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState('init')
   */
   static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item_login');
    loginButton.addEventListener('click', function (event) {
      event.preventDefault();
      const loginModal = App.getModal('login');
      loginModal.open();
    });
  
    const registerButton = document.querySelector('.menu-item_register');
    registerButton.addEventListener('click', function (event) {
      event.preventDefault();
      const registerModal = App.getModal('register');
      registerModal.open();
    });
  
    const logoutButton = document.querySelector('.menu-item_logout');
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();
      User.logout(function (err, response) {
        console.log(response)
        if (response && response.success) {
          App.setState('init');
          App.updateWidgets(); // Обновление виджетов
        }
      });
    });
  }  
}
