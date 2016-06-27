import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jdbc-url', 'Integration | Component | jdbc url', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{jdbc-url}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#jdbc-url}}
      template block text
    {{/jdbc-url}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
