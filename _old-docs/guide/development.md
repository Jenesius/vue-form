## Почему значения нужно рекурсивно копировать?

Может возникнуть вопрос, почему в форме у нас есть переменная values, которая является чистым хранилищем
значений, почему нельзя реализовать её как гетер и проходить по всем зависимостям и получать их значение.
Это решение позволяет обойти 2 проблемы:

1. При удалении поля для ввода - будет теряться его значение
2. Как поступать, если в начале мы инициализировали форму `form.setValues(data)`, а затем добавили input.

Именно данная подход сосредоточить модель в одном месте, позволяет упростить разработку.