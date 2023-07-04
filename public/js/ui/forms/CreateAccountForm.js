/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
 class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (response) => {
      if (response && response.success) {
        this.element.reset(); // Сброс формы
        App.update(); // Обновление приложения
        const modal = this.element.closest('.modal'); // Нахождение окна с формой
        if (modal) {
          const modalInstance = App.getModal(); // Получение экземпляра модального окна
          modalInstance.close(); // Закрытие модального окна
        }
      }
    });
  }
}
