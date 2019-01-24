package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.AcceptanceCriteria;
import io.github.jhipster.application.repository.AcceptanceCriteriaRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AcceptanceCriteriaResource REST controller.
 *
 * @see AcceptanceCriteriaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class AcceptanceCriteriaResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AcceptanceCriteriaRepository acceptanceCriteriaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAcceptanceCriteriaMockMvc;

    private AcceptanceCriteria acceptanceCriteria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcceptanceCriteriaResource acceptanceCriteriaResource = new AcceptanceCriteriaResource(acceptanceCriteriaRepository);
        this.restAcceptanceCriteriaMockMvc = MockMvcBuilders.standaloneSetup(acceptanceCriteriaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AcceptanceCriteria createEntity(EntityManager em) {
        AcceptanceCriteria acceptanceCriteria = new AcceptanceCriteria()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return acceptanceCriteria;
    }

    @Before
    public void initTest() {
        acceptanceCriteria = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcceptanceCriteria() throws Exception {
        int databaseSizeBeforeCreate = acceptanceCriteriaRepository.findAll().size();

        // Create the AcceptanceCriteria
        restAcceptanceCriteriaMockMvc.perform(post("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acceptanceCriteria)))
            .andExpect(status().isCreated());

        // Validate the AcceptanceCriteria in the database
        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeCreate + 1);
        AcceptanceCriteria testAcceptanceCriteria = acceptanceCriteriaList.get(acceptanceCriteriaList.size() - 1);
        assertThat(testAcceptanceCriteria.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAcceptanceCriteria.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createAcceptanceCriteriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acceptanceCriteriaRepository.findAll().size();

        // Create the AcceptanceCriteria with an existing ID
        acceptanceCriteria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcceptanceCriteriaMockMvc.perform(post("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acceptanceCriteria)))
            .andExpect(status().isBadRequest());

        // Validate the AcceptanceCriteria in the database
        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = acceptanceCriteriaRepository.findAll().size();
        // set the field null
        acceptanceCriteria.setTitle(null);

        // Create the AcceptanceCriteria, which fails.

        restAcceptanceCriteriaMockMvc.perform(post("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acceptanceCriteria)))
            .andExpect(status().isBadRequest());

        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = acceptanceCriteriaRepository.findAll().size();
        // set the field null
        acceptanceCriteria.setDescription(null);

        // Create the AcceptanceCriteria, which fails.

        restAcceptanceCriteriaMockMvc.perform(post("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acceptanceCriteria)))
            .andExpect(status().isBadRequest());

        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcceptanceCriteria() throws Exception {
        // Initialize the database
        acceptanceCriteriaRepository.saveAndFlush(acceptanceCriteria);

        // Get all the acceptanceCriteriaList
        restAcceptanceCriteriaMockMvc.perform(get("/api/acceptance-criteria?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acceptanceCriteria.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getAcceptanceCriteria() throws Exception {
        // Initialize the database
        acceptanceCriteriaRepository.saveAndFlush(acceptanceCriteria);

        // Get the acceptanceCriteria
        restAcceptanceCriteriaMockMvc.perform(get("/api/acceptance-criteria/{id}", acceptanceCriteria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acceptanceCriteria.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcceptanceCriteria() throws Exception {
        // Get the acceptanceCriteria
        restAcceptanceCriteriaMockMvc.perform(get("/api/acceptance-criteria/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcceptanceCriteria() throws Exception {
        // Initialize the database
        acceptanceCriteriaRepository.saveAndFlush(acceptanceCriteria);

        int databaseSizeBeforeUpdate = acceptanceCriteriaRepository.findAll().size();

        // Update the acceptanceCriteria
        AcceptanceCriteria updatedAcceptanceCriteria = acceptanceCriteriaRepository.findById(acceptanceCriteria.getId()).get();
        // Disconnect from session so that the updates on updatedAcceptanceCriteria are not directly saved in db
        em.detach(updatedAcceptanceCriteria);
        updatedAcceptanceCriteria
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restAcceptanceCriteriaMockMvc.perform(put("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcceptanceCriteria)))
            .andExpect(status().isOk());

        // Validate the AcceptanceCriteria in the database
        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeUpdate);
        AcceptanceCriteria testAcceptanceCriteria = acceptanceCriteriaList.get(acceptanceCriteriaList.size() - 1);
        assertThat(testAcceptanceCriteria.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAcceptanceCriteria.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAcceptanceCriteria() throws Exception {
        int databaseSizeBeforeUpdate = acceptanceCriteriaRepository.findAll().size();

        // Create the AcceptanceCriteria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcceptanceCriteriaMockMvc.perform(put("/api/acceptance-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acceptanceCriteria)))
            .andExpect(status().isBadRequest());

        // Validate the AcceptanceCriteria in the database
        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcceptanceCriteria() throws Exception {
        // Initialize the database
        acceptanceCriteriaRepository.saveAndFlush(acceptanceCriteria);

        int databaseSizeBeforeDelete = acceptanceCriteriaRepository.findAll().size();

        // Get the acceptanceCriteria
        restAcceptanceCriteriaMockMvc.perform(delete("/api/acceptance-criteria/{id}", acceptanceCriteria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AcceptanceCriteria> acceptanceCriteriaList = acceptanceCriteriaRepository.findAll();
        assertThat(acceptanceCriteriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcceptanceCriteria.class);
        AcceptanceCriteria acceptanceCriteria1 = new AcceptanceCriteria();
        acceptanceCriteria1.setId(1L);
        AcceptanceCriteria acceptanceCriteria2 = new AcceptanceCriteria();
        acceptanceCriteria2.setId(acceptanceCriteria1.getId());
        assertThat(acceptanceCriteria1).isEqualTo(acceptanceCriteria2);
        acceptanceCriteria2.setId(2L);
        assertThat(acceptanceCriteria1).isNotEqualTo(acceptanceCriteria2);
        acceptanceCriteria1.setId(null);
        assertThat(acceptanceCriteria1).isNotEqualTo(acceptanceCriteria2);
    }
}
