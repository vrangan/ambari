import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobxml-config', 'Integration | Component | jobxml config', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{jobxml-config}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#jobxml-config}}
      template block text
    {{/jobxml-config}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
