#### 3.0.0 (2023-08-23)

##### Breaking Changes

*  remove method getValues ([5d90b4b5](https://github.com/Jenesius/vue-form/commit/5d90b4b5cab8f432a106df0abd65e46ec3b7e4b8))
*  remove check-dependence-for-changed-status. ([4956fcd7](https://github.com/Jenesius/vue-form/commit/4956fcd70e3c41d80406116bc36d82934e308580))

##### Documentation Changes

*  update docs for accepts changes. ([3b21023a](https://github.com/Jenesius/vue-form/commit/3b21023a9e72d62e324df84dfb1a9782f1bf9d94))
*  add ru/en language, update logo. ([51a4924c](https://github.com/Jenesius/vue-form/commit/51a4924c1a0cf07f934e3e59cafb4a2d454610d2))
*  add form/values/peculiarities ([1ce6f846](https://github.com/Jenesius/vue-form/commit/1ce6f8460d477aab0caa5d754a7c56ee21634dae))
*  add information about compare-merge-changes, compare-difference ([00179029](https://github.com/Jenesius/vue-form/commit/001790293e948c8426accc53dd6c78fd0681adc3))

##### New Features

*  Resolve 149, new method acceptChanges, test for acceptChanges. ([5cbc712f](https://github.com/Jenesius/vue-form/commit/5cbc712f1a19f36c5e8158ad928b994e667d42e2))
*  add availability page. ([4977ff4a](https://github.com/Jenesius/vue-form/commit/4977ff4a800c80f5cddaaa61624fa9d63eb2704f))
*  add page with validation info. Rename FormInputValidation to FormFieldValidation ([4d604060](https://github.com/Jenesius/vue-form/commit/4d604060f296a6eba18da1b5695b9c4fe08d43e3))
*  update debug, remove all console.log from /src ([258ec6e4](https://github.com/Jenesius/vue-form/commit/258ec6e4ebd94740f194750210d6b7a60724af57))
*  move all files to src folder. ([54ca2496](https://github.com/Jenesius/vue-form/commit/54ca2496842dcebd9cd11281577d2025962a3250))
*  add state/values hooks, add test for them. ([02b3f21b](https://github.com/Jenesius/vue-form/commit/02b3f21b899c86dd0e10eeeccec8d0e7a47c5109))
*  provide v-model to form-field ([953b7f05](https://github.com/Jenesius/vue-form/commit/953b7f05a07585f324cf0fceb962995581aab3bd))
*  pretty input-date. ([9fa85552](https://github.com/Jenesius/vue-form/commit/9fa85552d9ca95040f8fa983715a391be655dade))
*  add Date controller ([e748867b](https://github.com/Jenesius/vue-form/commit/e748867be86e688682148488e0147ccd239f3cfd))
*  update test for input-text ([c9d43a3b](https://github.com/Jenesius/vue-form/commit/c9d43a3bb8464daf7819bfb5e444901661a5eef3))
*  add validate method, add test. Resolve [#129](https://github.com/Jenesius/vue-form/pull/129) ([f14a56e1](https://github.com/Jenesius/vue-form/commit/f14a56e1180eac9ef948d7ac316d148fb60a7734))
*  new util findNearestPrefixFromArray, update available method. ([2585def3](https://github.com/Jenesius/vue-form/commit/2585def3434c245a85af1faeac5169797bab606b))
*  new util isPrefixName, update form availability ([9371cf72](https://github.com/Jenesius/vue-form/commit/9371cf7264a1b40867d81d4f251d4066899065e7))
*  add id, version, wait. Resolve [#128](https://github.com/Jenesius/vue-form/pull/128) ([4a288374](https://github.com/Jenesius/vue-form/commit/4a288374ae7b8e66a82e447e7282233ff14e1f9a))
*  add reactive for clean methods. Resolve [#124](https://github.com/Jenesius/vue-form/pull/124) ([c0993d05](https://github.com/Jenesius/vue-form/commit/c0993d0581a5228654fb466a9d63251575bd8921))
*  update set for clean values, modify setter form.value ([3429399f](https://github.com/Jenesius/vue-form/commit/3429399f41129c6fde03fd767bfecc6de82be97e))
*  add super compare function, Resolve [#123](https://github.com/Jenesius/vue-form/pull/123) ([0219a9ad](https://github.com/Jenesius/vue-form/commit/0219a9ad9217060bcd2d5033d5574a0ce30f704e))
*  Resolve [#96](https://github.com/Jenesius/vue-form/pull/96). ([95bdfda5](https://github.com/Jenesius/vue-form/commit/95bdfda5dc50833abdc8aba7d893ef64499f68e9))
*  update form.setValues. Adding new utils. ([b0df950f](https://github.com/Jenesius/vue-form/commit/b0df950fec625a18cc123aa5c0d27c663c66ea98))
*  saving changes for dependency queue ([f892e362](https://github.com/Jenesius/vue-form/commit/f892e362273f19a16ad3a344db8076d4b8ba0c74))
*  modify dispatch event. Add recursive dispatching event to children depends. ([e57777e3](https://github.com/Jenesius/vue-form/commit/e57777e337cb9890a52329db1352b3346097788f))
*  update event ([35e4b53e](https://github.com/Jenesius/vue-form/commit/35e4b53ebe5db636da9eb5eff18fb8e67d0a5ff0))
*  new compare-changes.ts function. ([3ab4a5cd](https://github.com/Jenesius/vue-form/commit/3ab4a5cd65bada80baf3e5281274aac3dc2b368a))

##### Bug Fixes

*  Resolve [#144](https://github.com/Jenesius/vue-form/pull/144), fix closing calendar, update click-outside.ts ([3abbc4ef](https://github.com/Jenesius/vue-form/commit/3abbc4ef483d26927a3c38c69f8153c0c3f9eb7d))
*  update input-date to UTC only. ([c8edbc51](https://github.com/Jenesius/vue-form/commit/c8edbc5100275e9f1bfab1f2ec400cd56d9d84d8))
*  update calendar grid ([2b334dd5](https://github.com/Jenesius/vue-form/commit/2b334dd51ab49a8638572aa4f54c8f26a967abdc))

##### Other Changes

* //github.com/Jenesius/vue-form into issue_142 ([c361ed42](https://github.com/Jenesius/vue-form/commit/c361ed4277eaa216f90f90f04e6ab34cbded6455))
*  onid, onversion. ([affa6d09](https://github.com/Jenesius/vue-form/commit/affa6d09f02efc628d5ca365e24c15b325dbd110))
*  resolve saving error and cleaning changes. ([60483a90](https://github.com/Jenesius/vue-form/commit/60483a9077c0c835cf3fd2fcca56fd428d699106))
*  insert input-date ([69e9b1f3](https://github.com/Jenesius/vue-form/commit/69e9b1f3c8557e32f8b388d3c612388c55be6f60))
*  replace test, add reject object ([c6160f60](https://github.com/Jenesius/vue-form/commit/c6160f60261dd75d2eb961f1b43c36a9a3741bd0))
*  cleanChangesByField ([c75c4e0d](https://github.com/Jenesius/vue-form/commit/c75c4e0d70c02d85127cb867d54710c4c6dddca4))
* clean ([e6fade17](https://github.com/Jenesius/vue-form/commit/e6fade178ccb745e7533f4b996c1c2392af67ac8))

##### Refactors

*  creating compare function. ([abf7325a](https://github.com/Jenesius/vue-form/commit/abf7325ad5f8ca97cce8c41e2838bc4895076647))
*  update oninput event ([0d94262b](https://github.com/Jenesius/vue-form/commit/0d94262b6f5dd6b058333f4bf20e88964e1b8209))
*  move some files to /src folder, deprecate proxy form ([76cfdb09](https://github.com/Jenesius/vue-form/commit/76cfdb0921a708a39d9d9b7897ea140df54f0fe6))

##### Tests

*  add full liveCircle test ([8434ffd1](https://github.com/Jenesius/vue-form/commit/8434ffd175495a918c68f568f960391a1806edea))
*  adding test for input-date. Resolve [#111](https://github.com/Jenesius/vue-form/pull/111) ([e6d29a50](https://github.com/Jenesius/vue-form/commit/e6d29a50ef9e7f8a1ab7d2a2a1094d0b942cafdb))
*  resolve input-text checking ([5d6618bf](https://github.com/Jenesius/vue-form/commit/5d6618bff7959954b369c7d3ceb2ce8b8905b2a4))
*  update tests for input-text, fix useModify ([221990e6](https://github.com/Jenesius/vue-form/commit/221990e6219882f0ab0ef501ff4b113baa186509))
*  add test for input-text ([80a0ff13](https://github.com/Jenesius/vue-form/commit/80a0ff13727372410455beaedbe3d3f0e359cb0f))
*  add test for onavailability. Resolve [#131](https://github.com/Jenesius/vue-form/pull/131) ([b1616822](https://github.com/Jenesius/vue-form/commit/b16168223675e58008236d57bf755b412eac67ca))
*  new test for disable/enable form ([067ebb71](https://github.com/Jenesius/vue-form/commit/067ebb71efb05bf160d2b177f1103f92513b96e7))
*  adding test for saving process ([7d5bfde3](https://github.com/Jenesius/vue-form/commit/7d5bfde32812e5214edc0bd32f4076e7798a72da))
*  adding test for readData. Fix run promises. ([47754857](https://github.com/Jenesius/vue-form/commit/47754857a6c493a1f8f8670b982e110650492b71))
*  update compare method. add checkDeepValue ([0e03c5f8](https://github.com/Jenesius/vue-form/commit/0e03c5f868e57e5fda488ac4df7fa82310ee5871))

#### 2.3.23 (2023-06-14)

##### New Features

*  add values to single-checkbox ([b4081329](https://github.com/Jenesius/vue-form/commit/b40813295dc3e710b8580d1b2af5a6d8a8550c0f))

##### Bug Fixes

* update input-number disabled, add check-point in use-modify.ts ([ba812111](https://github.com/Jenesius/vue-form/commit/ba81211131ec5e64d92417940599d9c96bab0dba))

##### Tests

*  form-proxy subscribe to form. ([10892809](https://github.com/Jenesius/vue-form/commit/108928093661d75b9f7f21d784365ee5ab4d4368))

#### 2.3.22 (2023-05-14)

##### Tests

*  form-proxy subscribe to form. ([10892809](https://github.com/Jenesius/vue-form/commit/108928093661d75b9f7f21d784365ee5ab4d4368))

#### 2.3.20 (2023-05-13)

##### Bug Fixes

*  add copy of object in use-input-state.ts ([07d02266](https://github.com/Jenesius/vue-form/commit/07d02266fe967793f77d4a8319cf0f1e51304e97))
*  add copy of object in use-input-state.ts ([cca6ddd9](https://github.com/Jenesius/vue-form/commit/cca6ddd933cfbc4ceeb6b41c6a48b3cfe049abf6))

#### 2.3.19 (2023-04-22)

##### Documentation Changes

*  add information about new prop 'changed'. Add info about converting options. ([edc8d091](https://github.com/Jenesius/vue-form/commit/edc8d091a054d03a5146ea83cadf28de556a03fc))

##### New Features

*  update input-number, add suffix ([b37e123f](https://github.com/Jenesius/vue-form/commit/b37e123f4bfac93248a40e3ce88e9420d0d3ef0b))
*  fix pretty, update regex for text[numeric] ([839f6c7f](https://github.com/Jenesius/vue-form/commit/839f6c7fd449b62a5240c7077910bf45685bd6ce))
*  update name to checkDependenceForChangedStatus. add new test for it. ([e42b9364](https://github.com/Jenesius/vue-form/commit/e42b936473bac7937757e3799c6b3be98f411995))
*  new prop in the input-state "changed" ([a1d2fcd8](https://github.com/Jenesius/vue-form/commit/a1d2fcd8975e45faf1b5411fbbaa9ad9ad498783))
*  new until check-name-in-object ([96daed74](https://github.com/Jenesius/vue-form/commit/96daed748aab60fe75382d7708d35be8cff03e9c))

##### Bug Fixes

*  update input-number disabled, add check-point in use-modify.ts ([ba812111](https://github.com/Jenesius/vue-form/commit/ba81211131ec5e64d92417940599d9c96bab0dba))

#### 2.3.18 (2023-04-17)

##### New Features

*  update input-number, add suffix ([b37e123f](https://github.com/Jenesius/vue-form/commit/b37e123f4bfac93248a40e3ce88e9420d0d3ef0b))
*  fix pretty, update regex for text[numeric] ([839f6c7f](https://github.com/Jenesius/vue-form/commit/839f6c7fd449b62a5240c7077910bf45685bd6ce))

#### 2.3.17 (2023-04-05)

##### Documentation Changes

*  add information about new prop 'changed'. Add info about converting options. ([edc8d091](https://github.com/Jenesius/vue-form/commit/edc8d091a054d03a5146ea83cadf28de556a03fc))

##### New Features

*  update name to checkDependenceForChangedStatus. add new test for it. ([e42b9364](https://github.com/Jenesius/vue-form/commit/e42b936473bac7937757e3799c6b3be98f411995))
*  new prop in the input-state "changed" ([a1d2fcd8](https://github.com/Jenesius/vue-form/commit/a1d2fcd8975e45faf1b5411fbbaa9ad9ad498783))
*  new until check-name-in-object ([96daed74](https://github.com/Jenesius/vue-form/commit/96daed748aab60fe75382d7708d35be8cff03e9c))

#### 2.3.16 (2023-04-03)

##### Refactors

*  Update input-select, fix for input-number, add new page(all-inputs) to docs-example. ([c43f6a48](https://github.com/Jenesius/vue-form/commit/c43f6a48698c372e38e7929f43ea83ed827235b3))
*  Update input-range. ([d28d49c8](https://github.com/Jenesius/vue-form/commit/d28d49c8b9ce45d6d1656105efe0d5c6656d46fd))
*  Update tabindex for input-radio. Add inputs to all-inputs. ([87e3312b](https://github.com/Jenesius/vue-form/commit/87e3312b265a1093d3ffad4aa10402bd3b0e8c68))
*  update input-password, input-number, Add key.up and key.down handles for input-number. ([9cf7fd58](https://github.com/Jenesius/vue-form/commit/9cf7fd58a2443daad2dd92c0daeca45fd3dba4ae))
*  move checkbox to element-input-checkbox, update CSS for checkbox ([a957819c](https://github.com/Jenesius/vue-form/commit/a957819c462b8c35426e532bedc05d5510f99cfb))
*  Update input-tel ([5b62e215](https://github.com/Jenesius/vue-form/commit/5b62e2151e455ef03c202e2faa8bc491592e89d1))
*  Adding new variables, Update input-wrap.vue ([9f651fee](https://github.com/Jenesius/vue-form/commit/9f651fee13c06d871b798fd047861e38e777a94e))

##### Code Style Changes

*  update classes and styles for input-switch ([06f0422f](https://github.com/Jenesius/vue-form/commit/06f0422f8927e1a9783489018a6f119f43bce3f5))
*  new vars, change font-size, border-color, background, disabled, active ([650c21fe](https://github.com/Jenesius/vue-form/commit/650c21febe70d9626fcf801489b50091da214987))

#### 2.3.15 (2023-04-02)

##### Bug Fixes

*  remove changelog-generate file ([0681f007](https://github.com/Jenesius/vue-form/commit/0681f007f23f31cfdc5a7e458804262618266a61))

##### Other Changes

*  numeric ([c7eba02e](https://github.com/Jenesius/vue-form/commit/c7eba02ea3853b2ff79af63d0426e068d2df42dc))

#### 2.3.14 (2023-03-31)

##### Bug Fixes

*  remove 14 version of Node ([1c5091f5](https://github.com/Jenesius/vue-form/commit/1c5091f51ae8538416889018ab610bddc00768f9))

#### 2.3.13 (2023-03-31)

##### Build System / Dependencies

*  removing rollup, build by vite ([57de6cf4](https://github.com/Jenesius/vue-form/commit/57de6cf404b312f45d9b1ab0c4a4798163bcfa33))

#### 2.3.12 (2023-03-31)

##### Documentation Changes

* **input-text:**  New page about input[type='text'] ([3ff5e2a5](https://github.com/Jenesius/vue-form/commit/3ff5e2a5c2a30031a4b9ecddaaebdd06e8ebd690))

##### Bug Fixes

* **input-text:**  Update types, width, maxlength ([038a87ff](https://github.com/Jenesius/vue-form/commit/038a87fffd8768c5f679cb4b8b5863b403958d12))

