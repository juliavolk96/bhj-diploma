/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (err) {
        console.error("Error creating account:", err);
        return;
      }
      this.element.reset();
      const modal = this.element.closest(".modal");
      console.log(modal);
      if (modal) {
        const modalInstance = App.getModal('createAccount'); // Получение экземпляра модального окна
        modalInstance.close();
      }
      App.update();
    });
  }
}
