package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TeamMember;
import io.github.jhipster.application.repository.TeamMemberRepository;
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
 * REST controller for managing TeamMember.
 */
@RestController
@RequestMapping("/api")
public class TeamMemberResource {

    private final Logger log = LoggerFactory.getLogger(TeamMemberResource.class);

    private static final String ENTITY_NAME = "teamMember";

    private final TeamMemberRepository teamMemberRepository;

    public TeamMemberResource(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    /**
     * POST  /team-members : Create a new teamMember.
     *
     * @param teamMember the teamMember to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teamMember, or with status 400 (Bad Request) if the teamMember has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/team-members")
    @Timed
    public ResponseEntity<TeamMember> createTeamMember(@Valid @RequestBody TeamMember teamMember) throws URISyntaxException {
        log.debug("REST request to save TeamMember : {}", teamMember);
        if (teamMember.getId() != null) {
            throw new BadRequestAlertException("A new teamMember cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeamMember result = teamMemberRepository.save(teamMember);
        return ResponseEntity.created(new URI("/api/team-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /team-members : Updates an existing teamMember.
     *
     * @param teamMember the teamMember to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teamMember,
     * or with status 400 (Bad Request) if the teamMember is not valid,
     * or with status 500 (Internal Server Error) if the teamMember couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/team-members")
    @Timed
    public ResponseEntity<TeamMember> updateTeamMember(@Valid @RequestBody TeamMember teamMember) throws URISyntaxException {
        log.debug("REST request to update TeamMember : {}", teamMember);
        if (teamMember.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeamMember result = teamMemberRepository.save(teamMember);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teamMember.getId().toString()))
            .body(result);
    }

    /**
     * GET  /team-members : get all the teamMembers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of teamMembers in body
     */
    @GetMapping("/team-members")
    @Timed
    public List<TeamMember> getAllTeamMembers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TeamMembers");
        return teamMemberRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /team-members/:id : get the "id" teamMember.
     *
     * @param id the id of the teamMember to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teamMember, or with status 404 (Not Found)
     */
    @GetMapping("/team-members/{id}")
    @Timed
    public ResponseEntity<TeamMember> getTeamMember(@PathVariable Long id) {
        log.debug("REST request to get TeamMember : {}", id);
        Optional<TeamMember> teamMember = teamMemberRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(teamMember);
    }

    /**
     * DELETE  /team-members/:id : delete the "id" teamMember.
     *
     * @param id the id of the teamMember to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/team-members/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long id) {
        log.debug("REST request to delete TeamMember : {}", id);

        teamMemberRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
