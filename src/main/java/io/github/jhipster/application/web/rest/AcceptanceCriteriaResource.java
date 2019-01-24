package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.AcceptanceCriteria;
import io.github.jhipster.application.repository.AcceptanceCriteriaRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AcceptanceCriteria.
 */
@RestController
@RequestMapping("/api")
public class AcceptanceCriteriaResource {

    private final Logger log = LoggerFactory.getLogger(AcceptanceCriteriaResource.class);

    private static final String ENTITY_NAME = "acceptanceCriteria";

    private final AcceptanceCriteriaRepository acceptanceCriteriaRepository;

    public AcceptanceCriteriaResource(AcceptanceCriteriaRepository acceptanceCriteriaRepository) {
        this.acceptanceCriteriaRepository = acceptanceCriteriaRepository;
    }

    /**
     * POST  /acceptance-criteria : Create a new acceptanceCriteria.
     *
     * @param acceptanceCriteria the acceptanceCriteria to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acceptanceCriteria, or with status 400 (Bad Request) if the acceptanceCriteria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acceptance-criteria")
    @Timed
    public ResponseEntity<AcceptanceCriteria> createAcceptanceCriteria(@Valid @RequestBody AcceptanceCriteria acceptanceCriteria) throws URISyntaxException {
        log.debug("REST request to save AcceptanceCriteria : {}", acceptanceCriteria);
        if (acceptanceCriteria.getId() != null) {
            throw new BadRequestAlertException("A new acceptanceCriteria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcceptanceCriteria result = acceptanceCriteriaRepository.save(acceptanceCriteria);
        return ResponseEntity.created(new URI("/api/acceptance-criteria/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acceptance-criteria : Updates an existing acceptanceCriteria.
     *
     * @param acceptanceCriteria the acceptanceCriteria to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acceptanceCriteria,
     * or with status 400 (Bad Request) if the acceptanceCriteria is not valid,
     * or with status 500 (Internal Server Error) if the acceptanceCriteria couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acceptance-criteria")
    @Timed
    public ResponseEntity<AcceptanceCriteria> updateAcceptanceCriteria(@Valid @RequestBody AcceptanceCriteria acceptanceCriteria) throws URISyntaxException {
        log.debug("REST request to update AcceptanceCriteria : {}", acceptanceCriteria);
        if (acceptanceCriteria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcceptanceCriteria result = acceptanceCriteriaRepository.save(acceptanceCriteria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acceptanceCriteria.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acceptance-criteria : get all the acceptanceCriteria.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acceptanceCriteria in body
     */
    @GetMapping("/acceptance-criteria")
    @Timed
    public List<AcceptanceCriteria> getAllAcceptanceCriteria() {
        log.debug("REST request to get all AcceptanceCriteria");
        return acceptanceCriteriaRepository.findAll();
    }

    /**
     * GET  /acceptance-criteria/:id : get the "id" acceptanceCriteria.
     *
     * @param id the id of the acceptanceCriteria to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acceptanceCriteria, or with status 404 (Not Found)
     */
    @GetMapping("/acceptance-criteria/{id}")
    @Timed
    public ResponseEntity<AcceptanceCriteria> getAcceptanceCriteria(@PathVariable Long id) {
        log.debug("REST request to get AcceptanceCriteria : {}", id);
        Optional<AcceptanceCriteria> acceptanceCriteria = acceptanceCriteriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acceptanceCriteria);
    }

    /**
     * DELETE  /acceptance-criteria/:id : delete the "id" acceptanceCriteria.
     *
     * @param id the id of the acceptanceCriteria to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acceptance-criteria/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcceptanceCriteria(@PathVariable Long id) {
        log.debug("REST request to delete AcceptanceCriteria : {}", id);

        acceptanceCriteriaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
