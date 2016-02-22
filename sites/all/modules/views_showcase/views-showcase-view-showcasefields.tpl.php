<?php
?>
<?php foreach ($fields as $id => $field): ?>
  <div class="views-field-<?php print $field->class.$field->custom_class; ?>">
    <?php if ($field->label): ?>
      <label class="views-label-<?php print $field->class; ?> views-showcase-field-label">
        <?php print $field->label; ?>:
      </label>
    <?php endif; ?>
    <div class="views-showcase-field-content"><?php print $field->content; ?></div>
  </div>
<?php endforeach; ?>
