package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Goal.
 */
@Entity
@Table(name = "goal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Goal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @OneToMany(mappedBy = "goal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AcceptanceCriteria> acceptanceCriteria = new HashSet<>();
    @OneToMany(mappedBy = "goal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Team> teams = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Goal title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<AcceptanceCriteria> getAcceptanceCriteria() {
        return acceptanceCriteria;
    }

    public Goal acceptanceCriteria(Set<AcceptanceCriteria> acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
        return this;
    }

    public Goal addAcceptanceCriteria(AcceptanceCriteria acceptanceCriteria) {
        this.acceptanceCriteria.add(acceptanceCriteria);
        acceptanceCriteria.setGoal(this);
        return this;
    }

    public Goal removeAcceptanceCriteria(AcceptanceCriteria acceptanceCriteria) {
        this.acceptanceCriteria.remove(acceptanceCriteria);
        acceptanceCriteria.setGoal(null);
        return this;
    }

    public void setAcceptanceCriteria(Set<AcceptanceCriteria> acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public Set<Team> getTeams() {
        return teams;
    }

    public Goal teams(Set<Team> teams) {
        this.teams = teams;
        return this;
    }

    public Goal addTeam(Team team) {
        this.teams.add(team);
        team.setGoal(this);
        return this;
    }

    public Goal removeTeam(Team team) {
        this.teams.remove(team);
        team.setGoal(null);
        return this;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Goal goal = (Goal) o;
        if (goal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), goal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Goal{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
