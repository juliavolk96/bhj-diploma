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
    User.login(data, (err, response) => {
      console.log(response);
      if (response && response.success) {
        this.element.reset(); // Сброс формы
        const modal = this.element.closest(".modal"); // Нахождение окна с формой
        if (modal) {
          const modalInstance = App.getModal(
            modal.getAttribute("data-modal-id")
          ); // Получение экземпляра модального окна
          modalInstance.close(); // Закрытие модального окна
        }
        App.setState("user-logged"); // Установка состояния приложения
        App.updateWidgets(); // Обновление виджетов
      }
    });
  }
}
