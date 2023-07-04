/**
 * Класс RegisterForm управляет формой
 * регистрации
 */
 class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   */
  onSubmit(data) {
    User.register(data, (response) => {
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
