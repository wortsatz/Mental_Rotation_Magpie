// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
   title: 'Welcome to this experiment',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `Thank you for paticipating!`,
  buttonText: 'Begin the experiment'
});

// For most tasks, you need instructions views
const instructions_practice = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions_practice',
  title: 'General Instructions',
  text: `In this experiment you will be shown two pictures of geometrical objects that could potentially be the same. Your         task is to compare the objects and decide if the objects are the same or not. For this you will press either the           key 'F' if the objects are the same, or you will press 'J' if they are not the same. 
        </br> 
        We will first take a few trials to practice this and for you to get aquainted with the procedure. In this step you         will get feedback if your choice was correct or not.
        </br> 
        Please try to be as quick but also as accurate as possible.
  `,
  buttonText: 'go to the practice'
});

const instructions_main = magpieViews.view_generator("instructions", {
    trials: 1,
    name: 'instructions_main',
    title: 'Get ready for the main experiment',
    text:  `After the practice we will now move to the main experiment. This time there will be no feedback. 
           </br> 
           Please try to be as quick but also as accurate as possible.`,
    buttonText: 'begin'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze our results.',
  buttonText: 'next',
  age_question: 'Age',
  gender_question: 'Gender',
  gender_male: 'Male',
  gender_female: 'Female',
  gender_other: 'Other',
  languages_question: 'Native Languages',
  languages_more: 'Languages spoken at home',
  edu_question: 'Education Level',
  edu_graduated_high_school: 'Graduated High School',
  edu_graduated_college: 'Graduated College',
  edu_higher_degree: 'Higher Degree'
  


  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/



const practice = custom_views.keypress_rotation_practice({
    trials: 12,
    // trials: 2,
    name: 'practice',
    trial_type: 'practice',
    pause: 250,
    /*stim_duration: 7500,*/
    data: _.shuffle(practice_trials.key_press),
    key1: "f",
    key2: "j",
    f: "same",
    j: "different",
    hook: {
        after_response_enabled: check_response
    }
});


const main = custom_views.keypress_rotation_main({
    trials: 48,
    // trials: 8,
    name: 'main',
    trial_type: 'main',
    pause: 250,
    /*stim_duration: 7500,*/
    data: _.shuffle(main_trials.key_press),
    key1: "f",
    key2: "j",
    f: "same",
    j: "different",
});

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
