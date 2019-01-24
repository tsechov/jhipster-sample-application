package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TeamMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TeamMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {

    @Query(value = "select distinct team_member from TeamMember team_member left join fetch team_member.tasks",
        countQuery = "select count(distinct team_member) from TeamMember team_member")
    Page<TeamMember> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct team_member from TeamMember team_member left join fetch team_member.tasks")
    List<TeamMember> findAllWithEagerRelationships();

    @Query("select team_member from TeamMember team_member left join fetch team_member.tasks where team_member.id =:id")
    Optional<TeamMember> findOneWithEagerRelationships(@Param("id") Long id);

}
