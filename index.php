<?php
  header("Location: index-" . getLanguage() . ".html");

  function getLanguage(){
    $availableLanguages = array('es', 'pt');
    $defaultLanguage = 'es';
    $token = strtok($_SERVER['HTTP_ACCEPT_LANGUAGE'], ",;");
    while ($token !== false) {
      $language = substr($token, 0, 2);
      if (in_array($language, $availableLanguages)) {
        return $language;
      }
      $token = strtok(",;");
    }
    return $defaultLanguage;
  }
