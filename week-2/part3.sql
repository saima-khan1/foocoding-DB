DELIMITER $$
CREATE TRIGGER check_language_count
BEFORE INSERT ON CountryLanguage
FOR EACH ROW
BEGIN
  DECLARE languageCount int
;
  SET languageCount = (
    SELECT COUNT(*)
    FROM CountryLanguage
    WHERE CountryCode = NEW.CountryCode
  );
  
  IF languageCount >= 10 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'The country already has 10 or more languages.';
  END IF;
END $$
DELIMITER ;

