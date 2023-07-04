/**
 * Класс LoginForm управляет формой
 * входа в портал
 */
 class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   */
  onSubmit(data) {
    User.login(data, (response) => {
      if (response && response.success) {
        this.element.reset(); // Сброс формы
        App.setState('user-logged'); // Установка состояния приложения
        const modal = this.element.closest('.modal'); // Нахождение окна с формой
        if (modal) {
          const modalInstance = App.getModal(); // Получение экземпляра модального окна
          modalInstance.close(); // Закрытие модального окна
        }
      }
    });
  }
}
