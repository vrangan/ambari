import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hive2-action', 'Integration | Component | hive2 action', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{hive2-action}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#hive2-action}}
      template block text
    {{/hive2-action}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
