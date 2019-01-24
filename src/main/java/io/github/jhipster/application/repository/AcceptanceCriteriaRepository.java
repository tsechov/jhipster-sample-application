package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.AcceptanceCriteria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AcceptanceCriteria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcceptanceCriteriaRepository extends JpaRepository<AcceptanceCriteria, Long> {

}
