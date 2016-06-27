import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-action-editor', 'Integration | Component | workflow action editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{workflow-action-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#workflow-action-editor}}
      template block text
    {{/workflow-action-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
