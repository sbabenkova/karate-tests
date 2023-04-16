@parallel=false
Feature: Проверка отчетов от Авито

  Background:
    //* url propertyServiceBaseUrl
    * url "https://new-company.vi.oooinex.ru"

  Scenario: 1. Проверка отчета 'Списка отчетов из Авито'
    #* path '/services/external/property/avito/reports/80751302?per_page=5&page=0&date_from=2022-10-27T14:48:50.52Z&date_to=2022-11-07T14:48:50.52Z'
    Given path '/services/external/property/avito/reports'
    And param per_page = 5
    And param page = 0
    And param date_from = '2022-10-27T14:48:50.52Z'
    And param  date_to = '2022-11-07T14:48:50.52Z'
    When method get
    Then status 200
    And print response
    And match response.reports[1] contains {"id":74463241}
    And match response == read('avitoReportsAll.json');


  Scenario: 2. Проверка отчета 'Отчет по Id из Авито (Все объявления из конкретной выгрузки)'
    #* path '/services/external/property/avito/reports/80751302
    Given path '/services/external/property/avito/reports/80751302'
    When method get
    Then status 200
    And print response
    And match $ contains {"report_id":80751302}
  And match response.items contains deep read('avitoReportsById.json')

