package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Goal;
import io.github.jhipster.application.repository.GoalRepository;
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
 * REST controller for managing Goal.
 */
@RestController
@RequestMapping("/api")
public class GoalResource {

    private final Logger log = LoggerFactory.getLogger(GoalResource.class);

    private static final String ENTITY_NAME = "goal";

    private final GoalRepository goalRepository;

    public GoalResource(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    /**
     * POST  /goals : Create a new goal.
     *
     * @param goal the goal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new goal, or with status 400 (Bad Request) if the goal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/goals")
    @Timed
    public ResponseEntity<Goal> createGoal(@Valid @RequestBody Goal goal) throws URISyntaxException {
        log.debug("REST request to save Goal : {}", goal);
        if (goal.getId() != null) {
            throw new BadRequestAlertException("A new goal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Goal result = goalRepository.save(goal);
        return ResponseEntity.created(new URI("/api/goals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /goals : Updates an existing goal.
     *
     * @param goal the goal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated goal,
     * or with status 400 (Bad Request) if the goal is not valid,
     * or with status 500 (Internal Server Error) if the goal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/goals")
    @Timed
    public ResponseEntity<Goal> updateGoal(@Valid @RequestBody Goal goal) throws URISyntaxException {
        log.debug("REST request to update Goal : {}", goal);
        if (goal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Goal result = goalRepository.save(goal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, goal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /goals : get all the goals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of goals in body
     */
    @GetMapping("/goals")
    @Timed
    public List<Goal> getAllGoals() {
        log.debug("REST request to get all Goals");
        return goalRepository.findAll();
    }

    /**
     * GET  /goals/:id : get the "id" goal.
     *
     * @param id the id of the goal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the goal, or with status 404 (Not Found)
     */
    @GetMapping("/goals/{id}")
    @Timed
    public ResponseEntity<Goal> getGoal(@PathVariable Long id) {
        log.debug("REST request to get Goal : {}", id);
        Optional<Goal> goal = goalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(goal);
    }

    /**
     * DELETE  /goals/:id : delete the "id" goal.
     *
     * @param id the id of the goal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/goals/{id}")
    @Timed
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        log.debug("REST request to delete Goal : {}", id);

        goalRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
