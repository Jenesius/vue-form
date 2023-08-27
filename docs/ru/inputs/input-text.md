<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле text

Поле используется для ввода текста.

- Ключевое слово `text`. Используется по умолчанию.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)).
