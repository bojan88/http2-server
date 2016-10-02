@library=needle

Feature: cache
  Background:
    Then shutdown server
    
  Scenario: enabled
    Given spawn --cache
    Then GET https://127.0.0.1:4443/index.html 200
    Then response headers.cache-control has public, max-age=0
    
  Scenario: maxAge
    Given spawn  --cache --maxAge 750000
    Then GET https://127.0.0.1:4443 200
    Then response headers.cache-control has public, max-age=750
    
  Scenario: disabled
    Given spawn --no-cache
    Then GET https://127.0.0.1:4443 200
    Then response headers.cache-control has _EMPTY_
    
  Scenario: shutdown
    And shutdown server
